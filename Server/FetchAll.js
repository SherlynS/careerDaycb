import onetService from "./OnetWebService.js";

export function getNextPageLink(links){
  if(links.link != null){
    for(const link of links.link){
      if(link.rel === 'next'){
          return link.href;
      }
    }
  }
  return null;  
}

export async function fetchPageData(url) {
    try {
        const startIndex = url.indexOf('mnm');
        const mnmUrl = url.substring(startIndex);
        const response = await onetService.call(mnmUrl);
        return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  export async function fetchAllCareerData(startUrl) {
    let currentPageUrl = startUrl;
    let allData = [];
  
    while (currentPageUrl) {
      // await new Promise(resolve => setTimeout(resolve, 200));
      const pageData = await fetchPageData(currentPageUrl);
      if (!pageData) {
        break; // Stop if there's an error fetching data
      }
      allData = allData.concat(pageData.career);
      currentPageUrl = getNextPageLink(pageData);
    }
    return allData;
  }

  export async function fetchAllQuizData(startUrl) {
    let currentPageUrl = startUrl;
    let allData = [];
  
    while (currentPageUrl) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const pageData = await fetchPageData(currentPageUrl);
      if (!pageData) {
        break; // Stop if there's an error fetching data
      }
      allData = allData.concat(pageData.question);
      currentPageUrl = getNextPageLink(pageData);
    }
    return allData;
  }

  