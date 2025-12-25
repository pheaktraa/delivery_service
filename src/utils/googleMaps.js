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
   try {
    const { Autocomplete } = await importLibrary("places");

    const autocomplete = new Autocomplete(inputElement, {
      componentRestrictions: { country: "kh" },
      fields: ["geometry", "formatted_address"],
    });

  autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        // Send the clean data back to the component
        callback({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    });
    return autocomplete;
  } catch (error) {
    console.error("Google Maps Autocomplete Error:", error);
  }
}

// Helper for Distance
export async function getDistance(origin, destination) {
  try {
    const { DistanceMatrixService } = await importLibrary("routes");
    const service = new DistanceMatrixService();

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: "DRIVING",
      }, (response, status) => {
        if (status === "OK") {
          const distanceValue = response.rows[0].elements[0].distance.value;
          resolve(distanceValue / 1000); // return km
        } else {
          reject(status);
        }
      });
    });
  } catch (error) {
    console.error("Google Maps Distance Error:", error);
  }
}

// Export importLibrary so other files can use it for Maps/Directions
export { importLibrary };