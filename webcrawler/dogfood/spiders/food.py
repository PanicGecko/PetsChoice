import scrapy
from ..items import DogfoodItem


class FoodSpider(scrapy.Spider):
    name = 'food'
    allowed_domains = ['chewy.com']
    
    def start_requests(self):
        for i in range(1, 129):
            url = ''
            if i == 1:
                url = 'https://www.chewy.com/b/food-332'
            else:
                url = 'https://www.chewy.com/b/food_c332_p{}'.format(i)
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        item_list = response.xpath('//section[@class="results-products js-tracked-product-list"]/article[@class="product-holder js-tracked-product  cw-card cw-card-hover"]')
        for it in item_list:
            url = 'https://www.chewy.com' + it.xpath('./a[@class="product"]/@href').get()
            print('url: ', url)
            yield scrapy.Request(url=url, callback=self.get_food_info)

    def get_food_info(self, response):
        item = DogfoodItem()
        item['image'] = response.xpath('//div[@id="product-image"]/div[@class="product-image-zoomer"]/a[@id="Zoomer"]/@href').get().strip()[2:]
        item['name'] = response.xpath('//div[@id="product-title"]/h1/text()').get().strip()
        item['made'] = response.xpath('//div[@id="product-title"]//span/text()').get().strip()
        item['price'] = response.xpath('//span[@class="ga-eec__price"]/text()').get().strip()
        item['url'] = response.url
        ingred_list = response.xpath('//section[@class="cw-tabs__content--left"]/p')
        if len(ingred_list) != 0:
            item['ingred'] = ingred_list[0].xpath('./text()').get().strip().replace(' [', ' ,').replace('],', ',').split(', ')
            item['ingred'][0] = item['ingred'][0].replace('New: ', '')
        yield item