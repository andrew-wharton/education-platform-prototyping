# Assessment Use Cases

0. Educator should be able to create an Assessment.

	0. Educator should be able to create a Multiple Choice Question (MCQ).
		0. MCQ should have a question.
		0. MCQ should have at least 2 answers.
		0. MCQ should have at least one correct answer.
		
	0. Educator should be able to add a MCQ to an Assessment.
	
		0. Educator should be able to update the question without modifying the original question.
			- Note: This should invlove most likely duplicating/cloning the question and editing, not editing in place, with a link back to the parent question, for the ability to pull in changes.
			
	0. Educator should be able to add metadata about the Test (or Question).
		- This may need to be in the form of attributes and tags (tags for metadata that does not require context eg. for search, attributes where the metadata does need context, eg. which standard? etc.) 
		
0. Student should be able to create a Test Result for a Test. *Note: the test result should likely contain a non-editable version of the test, rather than a dynamic link to the test (or a hash of the JSON data, or version or something), so we can be somewhat assured that the test was not modified after the answers were given.*

	0. Student should be able to add answers to the test result.

## Implementation notes

- A Multiple Choice Test seems to be just a special case of a test with only multiple choice questions.
- Other types of questions included short answer / essay
- These could be mixed and matched in a single test

### Example Content
- http://www.erlanger.kyschools.us/userfiles/2/Classes/204/tkam%20ch%201-4.pdf?id=309