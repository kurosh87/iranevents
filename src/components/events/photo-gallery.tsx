import { useState } from 'react'
import type { EventImage } from '@/types'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

interface PhotoGalleryProps {
  images: EventImage[]
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
    }
  }

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length)
    }
  }

  if (images.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium">No photos yet</p>
          <p className="text-sm text-muted-foreground">
            Be the first to share a photo from this event.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <img
              src={image.url}
              alt={image.caption ?? `Event photo ${index + 1}`}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      <AlertDialog
        open={lightboxIndex !== null}
        onOpenChange={() => closeLightbox()}
      >
        <AlertDialogContent className="max-w-4xl p-0">
          <AlertDialogHeader className="absolute right-2 top-2 z-10">
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 text-white hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogCancel>
          </AlertDialogHeader>

          {lightboxIndex !== null && (
            <div className="relative">
              <AlertDialogTitle className="sr-only">
                {images[lightboxIndex].caption ??
                  `Event photo ${lightboxIndex + 1}`}
              </AlertDialogTitle>

              <img
                src={images[lightboxIndex].url}
                alt={
                  images[lightboxIndex].caption ??
                  `Event photo ${lightboxIndex + 1}`
                }
                className="max-h-[80vh] w-full object-contain"
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {images[lightboxIndex].caption && (
                <div className="bg-black/75 p-4 text-center text-white">
                  {images[lightboxIndex].caption}
                </div>
              )}

              <div className="bg-black/75 p-2 text-center text-sm text-white/70">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
