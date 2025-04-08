export const base_url = "https://cricquize.onrender.com"
export const loginAPI = "/api/auth/login"
// Login User

// POST /api/auth/login
// Body:

// {
//   "username": "string",
//   "password": "string"
// }
// Returns: JWT token

export const createAccountAPI = "/api/auth/register"
// Register User

// POST /api/auth/register
// Body:

// {
//   "username": "string",
//   "password": "string",
//   "role": "user" or "admin"
// }
// Returns: JWT token
export const addQuestionAPI = "/api/questions"
// Add Question

// POST /api/questions
// Body:

// {
//   "question": "What is 2+2?",
//   "options": [
//     {
//       "text": "3",
//       "isCorrect": false
//     },
//     {
//       "text": "4",
//       "isCorrect": true
//     },
//     {
//       "text": "5",
//       "isCorrect": false
//     }
//   ]
// }
// Returns: Created question object
export const getAdminQuestionAPI = "/api/questions"
// Get All Questions

// GET /api/questions
// Returns: Array of all questions
export const getUserQuestionAPI = "/api/quiz/question"
// Get Random Question

// GET /api/quiz/question
// Returns: Question object with options (correct answer hidden)

// {
//   "_id": "questionId",
//   "question": "What is 2+2?",
//   "options": [
//     {
//       "_id": "optionId1",
//       "text": "3"
//     },
//     {
//       "_id": "optionId2",
//       "text": "4"
//     },
//     {
//       "_id": "optionId3",
//       "text": "5"
//     }
//   ]
// }
export const postAnsAPI = "/api/quiz/answer"
// Submit Answer

// POST /api/quiz/answer
// Body:

// {
//   "questionId": "string",
//   "optionId": "string"
// }
// Returns: Result object

// {
//   "correct": true/false,
//   "message": "Correct answer!" or "Wrong answer!"
// }

export const getUserScoreAPI = " /api/quiz/score"
// Get User Score

// GET /api/quiz/score
// Returns: User's current score

// {
//   "score": number
// }

export const getAllUsers = "/api/auth/getUser"
// Get All Users

// GET /api/auth/getUser
// Returns: All User's details

// [
//     {
//       "_id": "67f3828d395e2e3a91fec65d",
//       "username": "karodiyatanish@gmail.com",
//       "password": "$2a$10$lKseN2J8GzOCxp/6gHDFaeO1Ggc6FJ88WWYEeiqmVqGe30rwRN8aK",
//       "role": "user",
//       "score": 0,
//       "createdAt": "2025-04-07T07:45:17.124Z",
//       "updatedAt": "2025-04-07T07:45:17.124Z",
//       "__v": 0
//     }
//   ]


export const getUser = "/api/auth/getUserById/"
// Get User

// GET /api/auth/getUserById/:userId
// Returns: User details

// {
//     "_id": "67f3828d395e2e3a91fec65d",
//     "username": "karodiyatanish@gmail.com",
//     "password": "$2a$10$lKseN2J8GzOCxp/6gHDFaeO1Ggc6FJ88WWYEeiqmVqGe30rwRN8aK",
//     "role": "user",
//     "score": 0,
//     "createdAt": "2025-04-07T07:45:17.124Z",
//     "updatedAt": "2025-04-07T07:45:17.124Z",
//     "__v": 0
// }