class ApiService {
   constructor(baseURL_) {
      this.serviceRPC = new httpRPC(baseURL_['protocol'], baseURL_['host'], baseURL_['port'])

      // this.service = axios.create({
      //    baseURL: 'http://newsapi.org/v2',
      //    responseType: 'json',
      //    headers: {
      //       'x-api-key': '744ab99227124e14b99a2089579ab3f4'
      //    }
      // });

   }

   // get news feed data
   getFeedData(page) {
      return this.serviceRPC.invoke('/news', 'get-news', { 'page': page })
         .then(function (feed) {
            return feed
         })
   }
}
