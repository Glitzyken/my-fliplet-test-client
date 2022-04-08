new Vue({
  el: "#app",
  data: {
    baseUrl: "https://api.rss2json.com/v1/api.json", // update this before submitting TODO:
    rssUrl: null,
    altImg:
      "https://fliplet.com/wp-content/uploads/sites/4/2018/10/white-400px.png",
    items: [],
    isFetchingData: false,
  },
  methods: {
    async handleSearch() {
      try {
        this.isFetchingData = true;

        const completUrl = `${this.baseUrl}?rss_url=${this.rssUrl}`;
        const result = await axios.get(completUrl);

        const feed = result.data.feed;

        console.log({
          link: feed.link,
          title: feed.title,
          description: feed.description,
        });

        this.items = result.data.items;
        this.isFetchingData = false;
      } catch (err) {
        console.log(err);
        this.isFetchingData = false;
      }
    },
  },
});
