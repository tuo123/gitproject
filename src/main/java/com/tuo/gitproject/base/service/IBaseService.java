package com.tuo.gitproject.base.service;

import com.tuo.gitproject.base.entity.IBaseEntity;
import com.tuo.gitproject.util.result.ResultMsg;


public interface IBaseService<T extends IBaseEntity> {
	ResultMsg save(T t); 
	ResultMsg update(T t); 
	ResultMsg delete(T t); 
	ResultMsg delete(String[] guids);
	ResultMsg delete(String guids);
	ResultMsg fakeDelete(String[] guids);
	ResultMsg fakeDelete(String guids);
	T get(String guid);

	
}
