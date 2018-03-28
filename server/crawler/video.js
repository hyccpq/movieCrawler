const puppeteer = require('puppeteer');

const cover_url = 'https://movie.douban.com/subject/';
// const video_url = 'https://movie.douban.com/trailer/227782';
// const doubanId = 227782;

const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
});

process.on('message' ,async (movies) => {
	console.log('Start visit the target page');
	
	const brower = await puppeteer.launch({
		args: ['--no-sandbox'],
		dumpio: false
	})
	
	const cover_page = await brower.newPage();
	
	for(let i = 0; i < movies.length ;i++){
		let doubanId = movies[i].doubanId;
		await cover_page.goto(cover_url + doubanId, {
			waitUntil: 'networkidle2'
		});
		
		await sleep(1000);
		
		const cover = await cover_page.evaluate(() => {
			let $ = window.$;
			let it = $('.related-pic-video');
			
			if(it && it.length > 0){
				let links = it.attr('href');
				let covers = it.find('img').attr('src');
				
				return {
					links,
					covers
				}
			}
			return {}
		});
		
		let video
		
		if(cover.links){
			await cover_page.goto(cover.links, {
				waitUntil: 'networkidle2'
			});
			await sleep(1000);
			
			video = await cover_page.evaluate(() => {
				let $ = window.$;
				let item = $('source');
				if(item && item.length > 0){
					return item.attr('src');
				}
				return ''
			})
		}
		
		const data = {
			cover:cover.covers,
			video,
			doubanId
		};
		
		process.send(data);
	}
	
  // UnhandledPromiseRejectionWarning: ValidationError: Movie validation failed: cover: Cast to String failed for value "{ links: 'https://movie.douban.com/trailer/226645/#content',
  // covers: 'https://img3.doubanio.com/img/trailer/medium/2511634966.jpg?' }" at path "cover"
	brower.close();
	
	process.exit(0);
});