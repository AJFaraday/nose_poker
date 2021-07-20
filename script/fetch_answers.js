const AnswerFetcher = require('./../src/import/answer_fetcher.js')

var fetcher = new AnswerFetcher('codegolf.meta', 23701);
fetcher.clear_directory();
fetcher.get_answers();


