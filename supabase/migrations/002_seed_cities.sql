-- Seed cities data

INSERT INTO cities (id, name, country, region, coordinates, timezone, meetup_location) VALUES
-- Europe
('london', 'London', 'United Kingdom', 'europe', '{"lat": 51.5074, "lng": -0.1278}', 'Europe/London', '{"name": "The Persian Kitchen", "address": "25 Westbourne Grove, London W2 4UA", "coordinates": {"lat": 51.5153, "lng": -0.1912}}'),
('paris', 'Paris', 'France', 'europe', '{"lat": 48.8566, "lng": 2.3522}', 'Europe/Paris', '{"name": "Cafe de Flore", "address": "172 Boulevard Saint-Germain, 75006 Paris", "coordinates": {"lat": 48.854, "lng": 2.3326}}'),
('berlin', 'Berlin', 'Germany', 'europe', '{"lat": 52.52, "lng": 13.405}', 'Europe/Berlin', '{"name": "Mauerpark", "address": "Bernauer Str. 63-64, 13355 Berlin", "coordinates": {"lat": 52.5432, "lng": 13.4023}}'),
('amsterdam', 'Amsterdam', 'Netherlands', 'europe', '{"lat": 52.3676, "lng": 4.9041}', 'Europe/Amsterdam', '{"name": "Vondelpark", "address": "Vondelpark, Amsterdam", "coordinates": {"lat": 52.358, "lng": 4.8686}}'),
('barcelona', 'Barcelona', 'Spain', 'europe', '{"lat": 41.3851, "lng": 2.1734}', 'Europe/Madrid', '{"name": "Park Guell", "address": "08024 Barcelona", "coordinates": {"lat": 41.4145, "lng": 2.1527}}'),
('rome', 'Rome', 'Italy', 'europe', '{"lat": 41.9028, "lng": 12.4964}', 'Europe/Rome', '{"name": "Piazza Navona", "address": "Piazza Navona, 00186 Roma", "coordinates": {"lat": 41.8992, "lng": 12.4731}}'),
('vienna', 'Vienna', 'Austria', 'europe', '{"lat": 48.2082, "lng": 16.3738}', 'Europe/Vienna', '{"name": "Naschmarkt", "address": "Naschmarkt, 1060 Wien", "coordinates": {"lat": 48.1986, "lng": 16.3634}}'),
('prague', 'Prague', 'Czech Republic', 'europe', '{"lat": 50.0755, "lng": 14.4378}', 'Europe/Prague', '{"name": "Old Town Square", "address": "Staromestske namesti, 110 00 Praha", "coordinates": {"lat": 50.0875, "lng": 14.4213}}'),
('stockholm', 'Stockholm', 'Sweden', 'europe', '{"lat": 59.3293, "lng": 18.0686}', 'Europe/Stockholm', '{"name": "Gamla Stan", "address": "Gamla Stan, Stockholm", "coordinates": {"lat": 59.3258, "lng": 18.0716}}'),
('dublin', 'Dublin', 'Ireland', 'europe', '{"lat": 53.3498, "lng": -6.2603}', 'Europe/Dublin', '{"name": "Temple Bar", "address": "Temple Bar, Dublin 2", "coordinates": {"lat": 53.3455, "lng": -6.2634}}'),
('brussels', 'Brussels', 'Belgium', 'europe', '{"lat": 50.8503, "lng": 4.3517}', 'Europe/Brussels', '{"name": "Grand Place", "address": "Grand Place, 1000 Bruxelles", "coordinates": {"lat": 50.8467, "lng": 4.3525}}'),
('munich', 'Munich', 'Germany', 'europe', '{"lat": 48.1351, "lng": 11.582}', 'Europe/Berlin', '{"name": "Englischer Garten", "address": "Englischer Garten, 80538 Munchen", "coordinates": {"lat": 48.1642, "lng": 11.6056}}'),
('zurich', 'Zurich', 'Switzerland', 'europe', '{"lat": 47.3769, "lng": 8.5417}', 'Europe/Zurich', '{"name": "Zurich Lake", "address": "Zurichsee, Zurich", "coordinates": {"lat": 47.3667, "lng": 8.55}}'),
('copenhagen', 'Copenhagen', 'Denmark', 'europe', '{"lat": 55.6761, "lng": 12.5683}', 'Europe/Copenhagen', '{"name": "Nyhavn", "address": "Nyhavn, 1051 Kobenhavn", "coordinates": {"lat": 55.6798, "lng": 12.5914}}'),
('oslo', 'Oslo', 'Norway', 'europe', '{"lat": 59.9139, "lng": 10.7522}', 'Europe/Oslo', '{"name": "Vigeland Park", "address": "Nobels gate 32, 0268 Oslo", "coordinates": {"lat": 59.9271, "lng": 10.7003}}'),

-- North America
('new-york', 'New York', 'United States', 'north-america', '{"lat": 40.7128, "lng": -74.006}', 'America/New_York', '{"name": "Central Park", "address": "Central Park, New York, NY 10024", "coordinates": {"lat": 40.7829, "lng": -73.9654}}'),
('los-angeles', 'Los Angeles', 'United States', 'north-america', '{"lat": 34.0522, "lng": -118.2437}', 'America/Los_Angeles', '{"name": "Westwood", "address": "Westwood Village, Los Angeles, CA 90024", "coordinates": {"lat": 34.0611, "lng": -118.4466}}'),
('san-francisco', 'San Francisco', 'United States', 'north-america', '{"lat": 37.7749, "lng": -122.4194}', 'America/Los_Angeles', '{"name": "Dolores Park", "address": "Dolores St & 19th St, San Francisco, CA 94114", "coordinates": {"lat": 37.7596, "lng": -122.4269}}'),
('toronto', 'Toronto', 'Canada', 'north-america', '{"lat": 43.6532, "lng": -79.3832}', 'America/Toronto', '{"name": "North York", "address": "North York, Toronto, ON", "coordinates": {"lat": 43.7615, "lng": -79.4111}}'),
('vancouver', 'Vancouver', 'Canada', 'north-america', '{"lat": 49.2827, "lng": -123.1207}', 'America/Vancouver', '{"name": "Stanley Park", "address": "Stanley Park, Vancouver, BC V6G 1Z4", "coordinates": {"lat": 49.3017, "lng": -123.1417}}'),
('chicago', 'Chicago', 'United States', 'north-america', '{"lat": 41.8781, "lng": -87.6298}', 'America/Chicago', '{"name": "Millennium Park", "address": "201 E Randolph St, Chicago, IL 60602", "coordinates": {"lat": 41.8827, "lng": -87.6233}}'),
('seattle', 'Seattle', 'United States', 'north-america', '{"lat": 47.6062, "lng": -122.3321}', 'America/Los_Angeles', '{"name": "Pike Place Market", "address": "85 Pike St, Seattle, WA 98101", "coordinates": {"lat": 47.6097, "lng": -122.3422}}'),
('boston', 'Boston', 'United States', 'north-america', '{"lat": 42.3601, "lng": -71.0589}', 'America/New_York', '{"name": "Boston Common", "address": "Boston Common, Boston, MA 02108", "coordinates": {"lat": 42.3551, "lng": -71.0656}}'),
('miami', 'Miami', 'United States', 'north-america', '{"lat": 25.7617, "lng": -80.1918}', 'America/New_York', '{"name": "South Beach", "address": "Ocean Dr, Miami Beach, FL 33139", "coordinates": {"lat": 25.7826, "lng": -80.1341}}'),
('montreal', 'Montreal', 'Canada', 'north-america', '{"lat": 45.5017, "lng": -73.5673}', 'America/Montreal', '{"name": "Mount Royal", "address": "Mount Royal, Montreal, QC", "coordinates": {"lat": 45.5048, "lng": -73.5877}}'),
('austin', 'Austin', 'United States', 'north-america', '{"lat": 30.2672, "lng": -97.7431}', 'America/Chicago', '{"name": "Zilker Park", "address": "2100 Barton Springs Rd, Austin, TX 78704", "coordinates": {"lat": 30.267, "lng": -97.773}}'),
('denver', 'Denver', 'United States', 'north-america', '{"lat": 39.7392, "lng": -104.9903}', 'America/Denver', '{"name": "Civic Center Park", "address": "101 14th Ave, Denver, CO 80204", "coordinates": {"lat": 39.7392, "lng": -104.9847}}'),
('portland', 'Portland', 'United States', 'north-america', '{"lat": 45.5051, "lng": -122.675}', 'America/Los_Angeles', '{"name": "Pioneer Courthouse Square", "address": "701 SW 6th Ave, Portland, OR 97204", "coordinates": {"lat": 45.5189, "lng": -122.6795}}'),
('san-diego', 'San Diego', 'United States', 'north-america', '{"lat": 32.7157, "lng": -117.1611}', 'America/Los_Angeles', '{"name": "Balboa Park", "address": "1549 El Prado, San Diego, CA 92101", "coordinates": {"lat": 32.7341, "lng": -117.1446}}'),

-- Oceania
('sydney', 'Sydney', 'Australia', 'oceania', '{"lat": -33.8688, "lng": 151.2093}', 'Australia/Sydney', '{"name": "The Rocks", "address": "The Rocks, Sydney NSW 2000", "coordinates": {"lat": -33.859, "lng": 151.2085}}'),
('melbourne', 'Melbourne', 'Australia', 'oceania', '{"lat": -37.8136, "lng": 144.9631}', 'Australia/Melbourne', '{"name": "Federation Square", "address": "Swanston St & Flinders St, Melbourne VIC 3000", "coordinates": {"lat": -37.8179, "lng": 144.9691}}'),
('auckland', 'Auckland', 'New Zealand', 'oceania', '{"lat": -36.8485, "lng": 174.7633}', 'Pacific/Auckland', '{"name": "Auckland Domain", "address": "Auckland Domain, Auckland 1010", "coordinates": {"lat": -36.8599, "lng": 174.7722}}'),
('brisbane', 'Brisbane', 'Australia', 'oceania', '{"lat": -27.4698, "lng": 153.0251}', 'Australia/Brisbane', '{"name": "South Bank Parklands", "address": "South Bank Parklands, South Brisbane QLD 4101", "coordinates": {"lat": -27.4759, "lng": 153.0226}}'),
('perth', 'Perth', 'Australia', 'oceania', '{"lat": -31.9505, "lng": 115.8605}', 'Australia/Perth', '{"name": "Kings Park", "address": "Fraser Ave, Perth WA 6005", "coordinates": {"lat": -31.9601, "lng": 115.8426}}'),
('wellington', 'Wellington', 'New Zealand', 'oceania', '{"lat": -41.2865, "lng": 174.7762}', 'Pacific/Auckland', '{"name": "Waterfront", "address": "Wellington Waterfront, Wellington 6011", "coordinates": {"lat": -41.2865, "lng": 174.7811}}')

ON CONFLICT (id) DO NOTHING;
