import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import type { PutBlobResult } from '@vercel/blob'

const clerkEnabled = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function useClerkAuth() {
  if (!clerkEnabled) {
    return { isSignedIn: false }
  }
  const { useAuth } = require('@clerk/tanstack-react-start')
  return useAuth()
}
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon, LogIn, CheckCircle } from 'lucide-react'

interface ImageUploadProps {
  eventId: string
  onUpload?: (url: string) => void
}

export function ImageUpload({ eventId, onUpload }: ImageUploadProps) {
  const { isSignedIn } = useClerkAuth()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      if (file.size > 4.5 * 1024 * 1024) {
        setError('File size must be less than 4.5MB')
        return
      }
      setError(null)
      setSelectedFile(file)
      setUploadedUrl(null)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreview(null)
    setUploadedUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError(null)

    try {
      const timestamp = Date.now()
      const safeName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${eventId}/${timestamp}-${safeName}`

      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: selectedFile,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const blob = (await response.json()) as PutBlobResult
      setUploadedUrl(blob.url)
      onUpload?.(blob.url)
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        <LogIn className="h-4 w-4" />
        <span>Sign in to upload photos</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Label htmlFor="image-upload" className="text-sm font-medium">
        Upload Event Photo
      </Label>

      {uploadedUrl ? (
        <div className="relative">
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="h-40 w-full rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="font-medium">Uploaded!</span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-2 right-2"
            onClick={clearSelection}
          >
            Upload Another
          </Button>
        </div>
      ) : preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-full rounded-lg object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6"
            onClick={clearSelection}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-colors hover:bg-muted/50"
        >
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
          <span className="mt-2 text-sm text-muted-foreground">
            Click to select an image
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            Max 4.5MB
          </span>
        </label>
      )}

      <Input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/jpeg, image/png, image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {selectedFile && !uploadedUrl && (
        <div className="flex items-center gap-2">
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex-1"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </Button>
        </div>
      )}
    </div>
  )
}
