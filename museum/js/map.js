    // The value for 'accessToken' begins with 'pk...'
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWx5YTI0YnkiLCJhIjoiY2t1b2NsaTVlMDJkczJuczcxMDFjYWpmMSJ9.fHxV5j9Fum2kJZT5UNlfxw'; 
    const map = new mapboxgl.Map({
      container: 'map',
      // Replace YOUR_STYLE_URL with your style URL.
      style: 'mapbox://styles/ilya24by/ckup4ln9q04vf17oixrnrpi5o', 
      center: [2.337, 48.861],
      zoom: 14,
      
    });
