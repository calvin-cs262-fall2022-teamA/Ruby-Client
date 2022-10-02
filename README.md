# Ruby Client
Contains ruby application for running on devices
## Log in
### Structure
Based on [this](https://reactnavigation.org/docs/auth-flow/) tutorial.
### Requirements
1. database with API requests (saved to secure storage for now): register, login, get users, get permissions (first person to register automatically becomes an admin)
2. Async storage for local user token from server (repeated logins and same device, until logout clears asynch storage)
3. Single top level NavigationContainer and Stack.Navigator with boolean logic for different app states (login/register vs home vs home + inventory)

