/**
 * Rizal Rahman Portfolio — Blog Data Store Bridge
 * Re-exports unified content store for blog functionality.
 */
// Loads js/content-store.js
if (typeof getBlogPosts === 'undefined') {
  // If content-store is not yet loaded, inject it
  document.write('<script src="js/content-store.js"><\/script>');
}
