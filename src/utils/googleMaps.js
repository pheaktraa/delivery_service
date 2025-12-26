import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

// Initialize the Key once here
setOptions({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Standard name
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,    // Backup name
    version: "weekly",
    language: 'en', // force to English language
});

// Helper function to setup Autocomplete easily
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
        // Check if the overall API call worked
        if (status !== "OK") {
          return reject("Google API Error: " + status);
        }

        const element = response.rows[0].elements[0];

        // Check if a route was actually found
        if (status === "OK") {
          // const distanceValue = response.rows[0].elements[0].distance.value;
          const distanceValue = element.distance.value;
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

// Variable to store the timer so we can stop it later
let animationTimer = null;


// NEW: THE ANIMATION ENGINE (SHARED)
// Move a marker along a path in a specific amount of time.
export async function animateMarkerAlongPath(marker, path, durationSeconds = 15) {
  // Clear any existing animation first
  stopMarkerAnimation();

  if (!path || path.length === 0) return;

  const totalPoints = path.length;
  // Calculate how many milliseconds between each "step"
  const delay = (durationSeconds * 1000) / totalPoints; 
  
  let currentStep = 0;

  console.log(`Starting animation: ${totalPoints} steps at ${delay.toFixed(0)}ms each.`);

  animationTimer = setInterval(() => {
    if (currentStep < totalPoints) {
      const nextPos = path[currentStep];

      // ROTATION LOGIC
      if (currentStep < totalPoints - 1) {
        const nextNextPos = path[currentStep + 1];
        // This calculates the angle between this point and the next
        const heading = google.maps.geometry.spherical.computeHeading(nextPos, nextNextPos);
        const icon = marker.getIcon();
        if (icon) {
          icon.rotation = heading; // Rotate the icon
          marker.setIcon(icon);
        }
      }
    
      // Update the marker position on the map
      marker.setPosition(nextPos);
      
      currentStep++;
    } else {
      // Reached the end naturally
      console.log("Car has arrived at destination!");
      // We don't call stopMarkerAnimation() here immediately if we want it to stay.
      // Or we can just leave it there until the driver clicks the button.
      clearInterval(animationTimer); 
      animationTimer = null;

      // stopMarkerAnimation();
    }
  }, delay);
}


  // NEW: STOP & SKIP LOGIC
  // Stops the timer and optionally teleports the marker to the final spot.
export function stopMarkerAnimation(marker = null, finalPos = null) {
  if (animationTimer) {
    clearInterval(animationTimer);
    animationTimer = null;
    console.log("Animation Stopped.");
  }

  // If a marker and final position are provided, teleport it there immediately (The "Skip" move)
  if (marker && finalPos) {
    marker.setPosition(finalPos);
  }
}

// Export importLibrary so other files can use it for Maps/Directions
export { importLibrary };