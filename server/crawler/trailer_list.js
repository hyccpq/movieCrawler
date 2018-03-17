const puppeteer = require('puppeteer');

const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0';

const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
})

;(async () => {
	console.log('Start visit the target page');
	
	const brower = await puppeteer.launch({
		args: ['--no-sandbox'],
		dumpio: false
	})
	
	const page = await brower.newPage();
	await page.goto(url, {
		waitUntil: 'networkidle2'
	});
	
	await sleep(3000);
	
	await page.waitForSelector('.more');
	
	for (let i = 0; i < 1; i++){
		await sleep(3000);
		await page.click('.more');
	}
	
	const result = await page.evaluate(() => {
		let $ = window.$;
		let items = $('.list a');
		let links = [];
		
		if(items.length >= 1){
			items.each((index, item) => {
				let it = $(item);
				let doubanId = it.find('div').data('id');
				let title = it.find('p').text().replace(/[\\n|\s][\d+\.\d]*/g, '');
				let rate = Number(it.find('strong').text());
				let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio');
				
				links.push({
					doubanId,
					title,
					rate,
					poster
				})
			})
		}
		
		return links
	});
	
	brower.close();
	
	process.send({result});
	process.exit(0);
})();