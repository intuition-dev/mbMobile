class ApiService {
   constructor() {
      this.service = axios.create({
         baseURL: 'https://newsapi.org/v2',
         responseType: 'json',
         headers: {
            'x-api-key': '744ab99227124e14b99a2089579ab3f4'
         }
      });

   }

   // get news feed data
   getFeedData() {
      return this.service.get('/top-headlines', {
         params: {
            'country': 'us'
         }
      });
   }
}