const AnswerFetcher = require('./../src/import/answer_fetcher.js')

var fetcher = new AnswerFetcher('codegolf', 231681);
fetcher.clear_directory();
fetcher.get_answers();


