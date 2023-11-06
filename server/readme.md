create user using

curl -X POST -H "Content-Type: application/json" -d '{
  "name": "example_user",
  "employeeId": "user@example.com",
  "password": "secure_password"
}' http://localhost:5000/create-employee