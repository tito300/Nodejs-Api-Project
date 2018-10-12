**1** when creating error using http-errors, the error should be passed to next(). otherwise browser will not get a response.
**2** to change property name of all documents in db use $rename in an updateMany() method. ex: db.products.updateMany({}, {$rename: {'balance': 'price'}})
**3** Regex: .* is used to skip over to next match. "." means any charactor. "*" means any number of characters. \s is used to include line breaks.
**4** 304 status code indicates that client is requesting same resource that is cached. no need to worry about it.
**5** use --coverage to check testing coverage. view pretty layout in html file added to coverage folder.
**6** res.json works with arrays only.
**7** when using 'done' param in a test always use async/await (not return) and then call done at the end. Or remove done param as an arg and use return. 
**8** for test to exit, done must be passed as a parameter to afterall() without being used.
**9** to set enviroment, add the 'set NODE_ENV' to package.json file. 
**10** to use automatic mock use jest.fn('..'). for manual use folder __mocks__. then use imported modules as you would normally and jest will use mocks instead. 
**11** res.send(string) send the text in response.text property.
**12** to check mongoose connection use: mongoose.connection._readyState
**13** to create a methode for a model, add the method to Schema.methods.[name]=func...
**14** to avoid conflic use different port number for each test file
**15** make sure _id for product is a type of objectID otherwise references/populate will not work
**16** to save an array of schema use cart: [Schema];