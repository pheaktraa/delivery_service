import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

// 1. Initialize the Key once here
setOptions({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Standard name
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,    // Backup name
    version: "weekly",
    language: 'en', // force to English language
});

// 2. Helper function to setup Autocomplete easily
export async function setupAutocomplete(inputElement, callback) {
  const { Autocomplete } = await importLibrary("places");

  const autocomplete = new Autocomplete(inputElement, {
    componentRestrictions: { country: "kh" },
    fields: ["geometry", "formatted_address"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      // Send the clean data back to the component
      callback({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  });
  
  return autocomplete;
}

// 3. Export importLibrary so other files can use it for Maps/Directions
export { importLibrary };