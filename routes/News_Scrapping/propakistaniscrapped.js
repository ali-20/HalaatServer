var axios = require("axios");
var cheerio = require("cheerio");

async function propakistani() {
  const propakistaniArticles = [];

  await axios.get("https://www.geo.tv").then((res) => {
    if (res) {
      const $ = cheerio.load(res.data);
      // var article=$(".container")
      // //console.log(article.find("article").children(".entry-body").children("header").find("h3").text())
      // var morearticles=$("main")
      //console.log(morearticles.children("article").children("div").children(".col-8").children(".entry-header").children(".entry-title").children("a").html())

      const lis = $(".home_main_content li");

      lis.each((i, e) => {
        let title;
        let image = $(e)
          .children("div.m_pic")
          .children("a")
          .children("img")
          .attr("data-src");

        let link = $(e).children("div.m_pic").children("a").attr("href");

        title = $(e)
          .children("div.heading")
          .children("a")
          .children("h1")
          .text();

        if (title) {
          title = title;
        } else {
          title = $(e)
            .children("div.heading")
            .children("a")
            .children("h2")
            .text();
          title = title;
        }

        if (image != undefined && link != undefined && title != undefined) {
          var propakarticle = {
            image: image,
            link: link,
            title: title,
          };

          propakistaniArticles.push(propakarticle);
        }
      });

      //   lis.each((i, e) => {
      //     let articleli = $(e).html();
      //     console.log(articleli);
      //   });
    }

    //     article.each((i,el)=>{

    //         const image=$(el).find("article").children("figure").attr("data-bg")
    //         const imagestyle=$(el).find("article").children("figure").attr("style")
    //         const link=$(el).find("article").children("figure").children("a").attr("href")
    //         const title=$(el).find("article").children(".entry-body").children(".entry-header").children("h3").children("a").html()

    //         if(image!=undefined && link!=undefined && title!=undefined){

    //             var propakarticle={
    //                 "image":image,
    //                 "link":link,
    //                 "title":title
    //             }

    //             propakistaniArticles.push(propakarticle)

    //         }

    //     })

    //     morearticles.each((i, el)=>{

    //         //const link=$(el).children("article").children("div").find("div").children("header").find("h2").children("a").attr("href")
    //         //console.log(link)
    //         const title=$(morearticles).children("article").children("div").children(".col-8").children(".entry-header").children(".entry-title").children("a").html()
    //         const link=$(morearticles).children("article").children("div").children(".col-8").children(".entry-header").children(".entry-title").children("a").attr("href")
    //         const image=$(morearticles).children("article").children("div").children(".col-4").children("a").find("img").attr("data-lazy-src")

    //         if(image!=undefined && link!=undefined && title!=undefined){

    //         var morearticleobject={
    //             "image":image,
    //             "link":link,
    //             "title":title
    //         }

    //         propakistaniArticles.push(morearticleobject)

    //         }

    //     })

    // }
  });

  return propakistaniArticles;
}

module.exports = propakistani;
