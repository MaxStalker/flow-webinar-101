# Flow 101 - Start Building Now
Materials in this repository accompany Flow 101 webinar, showcasing basic interaction with network using available tools:
- [Flow Playground](https://play.onflow.org/)
- [Flow CLI](https://docs.onflow.org/flow-cli/)

### Cadence
`cadence` folder contains all the Cadence code necessary for project to work properly.
- `contracts` - single file have the code for the `YearbookManager` contract with all the annotations necessary to understand the code
- `transactions` - holds transactions necessary to init account and sign yearbook on other account
- `scripts` - scripts, which can be used to read messages from a specific account Yearbook

### CLI
We also prepared two folders with `shell` and `batch` scripts, which will allow you to easily run Flow CLI commands.

### Testing
`test` folder contains example on how you would approach testing Cadence code with [Flow JS Testing](https://github.com/onflow/flow-js-testing)
