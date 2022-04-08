new Vue({
  el: "#app",
  data: {
    baseUrl: "https://my-fliplet-test-api.herokuapp.com/api/v1/", // update this before submitting TODO:
    rssUrl: null,
    altImg:
      "https://fliplet.com/wp-content/uploads/sites/4/2018/10/white-400px.png",
    items: [],
    isFetchingData: false,
  },
  methods: {
    handleFormValidation() {
      if (!this.rssUrl) {
        alert("RSS URL must be filled out");
        return false;
      }

      if (
        !this.rssUrl.includes("http://") &&
        !this.rssUrl.includes("https://")
      ) {
        alert("RSS URL must be a valid url");
        return false;
      }

      return true;
    },

    async handleSearch() {
      try {
        this.isFetchingData = true;

        if (!this.handleFormValidation()) {
          this.isFetchingData = false;
          return;
        }

        const completUrl = `${this.baseUrl}rss-to-json?rss_url=${this.rssUrl}`;
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
