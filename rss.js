var Feed = require('feed');
var feed = new Feed({
    title:          'DGSrss | The latest entertainment news from around the world!!',
    description:    'This is my personnal feed!',
    link:           'http://example.com/',
    image:          'http://example.com/image.png',
    copyright:      'All rights reserved 2013, John Doe',
    
    author: {
        name:       'John Doe',
        email:      'johndoe@example.com',
        link:       'https://example.com/johndoe'
    }
});
    feed.item({
        title:        'Latest Movie Releases!' ,
        link:         'http://www.imdb.com/movies-in-theaters/',
      
    });
res.send(feed.render('rss-2.0'));