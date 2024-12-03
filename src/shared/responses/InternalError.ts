import { status_code } from '../consts/statusCode';

function InternalErrorResponse(resource: string, details: object): object {
  return {
    statusCode: status_code.INTERNAL_SERVER_ERROR,
    body: {
      resource: resource,
      message: `There was some error when the server tried to realize some work in the resource ${resource.toUpperCase()}`,
      details: details
    }
  };
}

export default InternalErrorResponse;
