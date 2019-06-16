class ApiService {
   constructor(baseURL_) {
      this.serviceRPC = new httpRPC(baseURL_['protocol'], baseURL_['host'], baseURL_['port'])
   }

   // get news feed data
   getFeedData(page) {
      return this.serviceRPC.invoke('/news', 'get-news', { 'page': page })
         .then(function (feed) {
            return feed
         })
   }
   
}
