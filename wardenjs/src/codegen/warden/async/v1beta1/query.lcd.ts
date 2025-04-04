//@ts-nocheck
import { setPaginationParams } from "../../../helpers.js";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryTasksRequest, QueryTasksResponseSDKType, QueryTaskByIdRequest, QueryTaskByIdResponseSDKType, QueryPendingTasksRequest, QueryPendingTasksResponseSDKType, QueryPluginsByValidatorRequest, QueryPluginsByValidatorResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.tasks = this.tasks.bind(this);
    this.taskById = this.taskById.bind(this);
    this.pendingTasks = this.pendingTasks.bind(this);
    this.pluginsByValidator = this.pluginsByValidator.bind(this);
  }
  /* Parameters queries the parameters of the module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `warden/async/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* Queries a list of Tasks. */
  async tasks(params: QueryTasksRequest): Promise<QueryTasksResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.creator !== "undefined") {
      options.params.creator = params.creator;
    }
    const endpoint = `warden/async/tasks`;
    return await this.req.get<QueryTasksResponseSDKType>(endpoint, options);
  }
  /* Queries a Task by its id. */
  async taskById(params: QueryTaskByIdRequest): Promise<QueryTaskByIdResponseSDKType> {
    const endpoint = `warden/async/task/${params.id}`;
    return await this.req.get<QueryTaskByIdResponseSDKType>(endpoint);
  }
  /* Queries Tasks that do not have a result yet. */
  async pendingTasks(params: QueryPendingTasksRequest = {
    pagination: undefined
  }): Promise<QueryPendingTasksResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `warden/async/pending_tasks`;
    return await this.req.get<QueryPendingTasksResponseSDKType>(endpoint, options);
  }
  /* Queries Plugins by validator. */
  async pluginsByValidator(params: QueryPluginsByValidatorRequest): Promise<QueryPluginsByValidatorResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `warden/async/plugins_by_validator/${params.validator}`;
    return await this.req.get<QueryPluginsByValidatorResponseSDKType>(endpoint, options);
  }
}