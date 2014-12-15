from project_module import project_object, image_object, link_object, challenge_object

p = project_object('mastermind', 'Generic code guessing game')
p.domain = 'http://www.aidansean.com/'
p.path = 'mastermind'
p.preview_image_ = image_object('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg', 408, 287)
p.github_repo_name = 'mastermind'
p.mathjax = True
p.links.append(link_object(p.domain, 'mastermind', 'Live page'))
p.introduction = 'This project was made as an exercise in dynamic HTML manipulation.  It\'s a clone of a classic code guessing game where the player plays against the computer.'
p.overview = '''The user has to guess the code and gets a score in the form of \(S=10A+B\) where '\(A\) is the number of correct guesses in the correct place and \(B\) is the number of correct guesses in the wrong place.'''

p.challenges.append(challenge_object('The number of rows and columns must match the user input and be maintained correctly..', 'This was the main purpose of the project, to investigate the safest and most performant way to achieve this.  It\'s mostly a matter of bookkeeping once it was achieved it made many future projects much easier.', 'Resolved'))
