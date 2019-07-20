import { facebook } from './facebook.api'

export const facebookService = {
  getPlacesByLocation
}

function getPlacesByLocation(lat, lng, callback) {
  facebook(fb => {
    fb.api('/search',
      'GET',
      {
        type: 'place',
        center: `${lat},${lng}`,
        distance: '1000',
        categories: ' ["FOOD_BEVERAGE"]',
        fields:
          'name,about,checkins,cover,website,parking,location,single_line_address',
        limit: '10',
        access_token: '363598267637406|inu9NdGgI_VbzrUYkgWQ7dRxD04'
      },
      callback
    );
  });
    
}
