const puppeteer = require('puppeteer');

const cover_url = 'https://movie.douban.com/subject/26384741';
const video_url = 'https://movie.douban.com/trailer/';
const doubanId = 227782;

const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
})

;(async () => {
	console.log('Start visit the target page');
	
	const brower = await puppeteer.launch({
		args: ['--no-sandbox'],
		dumpio: false
	})
	
	const cover_page = await brower.newPage();
	await cover_page.goto(cover_url, {
		waitUntil: 'networkidle2'
	});
	
	await sleep(1000);
	
	const cover = await cover_page.evaluate(() => {
		let $ = window.$;
		let it = $('.related-pic-video');
		let links = it.attr('href');
		let covers = it.find('img').attr('src');
		
		return {
			links,
			covers
		}
	});
	
	const video_page = await brower.newPage();
	await video_page.goto(video_url + doubanId, {
		waitUntil: 'networkidle2'
	});

	await sleep(1000);
	const video = await video_page.evaluate(() => {
		let $ = window.$;
		let item = $('source').attr('src');
		return item
	});
	
	let data = {
		cover,
		video
	};
	
	brower.close();
	
	process.send(data);
	process.exit(0);
})();