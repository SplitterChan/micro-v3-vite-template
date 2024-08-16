import { App } from 'vue';
import jsCookie from 'js-cookie';
import { name } from '~/package.json';

export enum CacheType {
  Session = 'sessionStorage',
  Storage = 'localStorage',
  Cookie = 'cookie'
}

export enum HandlerType {
  Set = 'set',
  Get = 'get',
  Remove = 'remove'
}

class Cache {
  static instance: Cache;
  private readonly uuid: string | undefined = undefined;

  constructor() {
    Cache.instance = this;
    if (import.meta.env.PROD) {
      const sessionUuid = sessionStorage.getItem(`${name}-CacheUuid`);
      this.uuid = sessionUuid ?? new Date().getTime().toString();
      this.uuid && sessionStorage.setItem(`${name}-CacheUuid`, this.uuid);
    }
  }

  static initial() {
    if (!Cache.instance) {
      new Cache();
    }
    return Cache.instance;
  }

  public install = (app: App): void => {
    app.config.globalProperties.$cache = Cache.instance;
  };

  private getCacheInstance = (type: CacheType) => {
    switch (type) {
      case CacheType.Session:
        return window.sessionStorage;
      case CacheType.Storage:
        return window.localStorage;
      case CacheType.Cookie:
        return jsCookie;
    }
  };

  private getHandlerMethod = (type: CacheType, handler: HandlerType) => {
    switch (type) {
      case CacheType.Session:
        return handler === HandlerType.Get
          ? window.sessionStorage.getItem
          : handler === HandlerType.Set
          ? window.sessionStorage.setItem
          : window.sessionStorage.removeItem;
      case CacheType.Storage:
        return handler === HandlerType.Get
          ? window.localStorage.getItem
          : handler === HandlerType.Set
          ? window.localStorage.setItem
          : window.localStorage.removeItem;
      case CacheType.Cookie:
        return handler === HandlerType.Get
          ? jsCookie.get
          : handler === HandlerType.Set
          ? jsCookie.set
          : jsCookie.remove;
    }
  };

  private combineUniqueKey = (key: string) => {
    return this.uuid ? `${key}-${this.uuid}` : key;
  };

  private cacheHandlerTarget = (
    handlerType: HandlerType,
    type: CacheType = CacheType.Session
  ) => {
    const instance = this.getCacheInstance(type);
    const handler = this.getHandlerMethod(type, handlerType);
    return {
      instance,
      handler
    };
  };

  private cacheHandlerBase = (
    key,
    handlerType: HandlerType,
    type: CacheType = CacheType.Session,
    ...rest: any[]
  ) => {
    const { instance, handler } = this.cacheHandlerTarget(handlerType, type);
    const uniqueKey = this.combineUniqueKey(key);
    return (handler as any).call(instance, uniqueKey, ...rest);
  };

  private cachePublicHandlerBase = (
    key,
    handlerType: HandlerType,
    type: CacheType = CacheType.Session,
    ...rest: any[]
  ) => {
    const { instance, handler } = this.cacheHandlerTarget(handlerType, type);
    return (handler as any).call(instance, key, ...rest);
  };

  public publicSet = (
    key: string,
    value: any,
    type: CacheType = CacheType.Session,
    expires: number = 7
  ) => {
    return this.cachePublicHandlerBase(key, HandlerType.Set, type, value, {
      expires
    });
  };

  public publicGet = (key: string, type: CacheType = CacheType.Session) => {
    return this.cachePublicHandlerBase(key, HandlerType.Get, type);
  };

  public publicRemove = (key: string, type: CacheType = CacheType.Session) => {
    return this.cachePublicHandlerBase(key, HandlerType.Remove, type);
  };

  public set = (
    key: string,
    value: any,
    type: CacheType = CacheType.Session,
    expires: number = 7
  ) => {
    this.cacheHandlerBase(key, HandlerType.Set, type, value, { expires });
  };

  public get = (key: string, type: CacheType = CacheType.Session) => {
    return this.cacheHandlerBase(key, HandlerType.Get, type);
  };

  public remove = (key: string, type: CacheType = CacheType.Session) => {
    this.cacheHandlerBase(key, HandlerType.Remove, type);
  };
}

export default Cache.initial();
