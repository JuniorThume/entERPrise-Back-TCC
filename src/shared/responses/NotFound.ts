import { status_code } from '../consts/statusCode';

function NotFoundResponse(resource: string, details: object): object {
  return {
    statusCode: status_code.NOT_FOUND,
    body: {
      resource: resource,
      message: `${resource.toUpperCase()} Not Found`,
      details: details
    }
  };
}

export default NotFoundResponse;
