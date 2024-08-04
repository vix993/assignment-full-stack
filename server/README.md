## Project Structure

I have quickly refactored the codebase using the repository pattern.

With more time I would wrap the services in interfaces and inject dependencies such as sequelize and repositories.

I might organise the models into domains.

I would also leverage sequelize ORM functionality (e.g. findAllAndCount for pagination).

I would look to add integration testing and unit testing to the endpoints with more time.
