package com.tuo.gitproject.base.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface IBaseDao<T> {
	
	int deleteByPrimaryKey(String guid);

    int insert(T record);

    int insertSelective(T record);

    T selectByPrimaryKey(String guid);

    int updateByPrimaryKeySelective(T record);

    int updateByPrimaryKey(T record);

	List<T> findDataGrid(Map<String, String> map);
	
	<Type> List<Type> findData(Map<String, String> map);

	int fakeDelete(@Param("guid") String guid, @Param("scr") String scr);

	List<T> findQtTable(Map<String, String> params);
}
