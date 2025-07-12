# Webizen API Documentation

## Endpoints

### `/modules/register`
- **Method**: POST
- **Description**: Register a new module.
- **Request Body**:
  ```json
  {
    "name": "moduleName",
    "version": "1.0.0"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Module registered successfully."
  }
  ```

### `/modules/unregister`
- **Method**: DELETE
- **Description**: Unregister an existing module.

### `/resources/load`
- **Method**: GET
- **Description**: Load resources for a module.

## Extension Guidelines
- Modules should implement standardized interfaces.
- Use SPHINCS+ for secure communication.
