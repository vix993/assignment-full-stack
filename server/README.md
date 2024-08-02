## Project Structure

Below is high level example of how the project could be structured initially.

Adding the routes dir allows us to organise our repositories.

The sequelize dir allows us to instantiate sequelize for injection.

The modules folder is an example of how we can organise seperate services within the app.

The main.ts file would then be responsible for managing dependency injection of these components.

- src/
  - db/
  - routes/
  - sequelize/
  - modules/
    - [service_name]/
      - business_service/
      - data_service/
  - tests/
  - main.ts
