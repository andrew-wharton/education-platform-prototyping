# Assessment Use Cases

0. Educator should be able to create an Assessment Template.

	0. Educator should be able to create an Multiple Choice Question (MCQ).
		0. MCQ should have a question.
		0. MCQ should have at leaest 2 answers.
		0. MCQ should have at least one correct answer.
		
	0. Educator should be able to add a MCQ to an Assessment Template.
	
		0. Educator should be able to update the question without modifying the original question.
			- Note: This should invlove most likely duplicating/cloning the question and editing, not editing in place, with a link back to the parent question, for the ability to pull in changes.
			
	0. Educator should be able to add metadata about the Assessment or Assessment Item (Question).
		- This may need to be in the form of attributes and tags (tags for metadata that does not require context eg. for search, attributes where the metadata does need context, eg. which standard? etc.) 
		
0. Student should be able to create an Assessment. *Note: Do we need to provide some sort of assurance that the assessment hasn't been changed in the system after it was submitted? eg. provide a hash of the assessment and answers which is then stored independently of the assessment to provide this integrity check. Since we don't have hard copies of assessment (or do we in fact need hard copies), we need a mechanism for providing trust in the system.*

	0. Student should be able to add answers to the assessment.

## Notes

- A Multiple Choice Test appears to be just a special case of a test with only multiple choice questions.
- Other types of assessment items could included short answer / essay / oral presentation / project / physical artifact etc.

### Example Assessment
- http://www.erlanger.kyschools.us/userfiles/2/Classes/204/tkam%20ch%201-4.pdf?id=309
