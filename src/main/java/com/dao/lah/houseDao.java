package com.dao.lah;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface houseDao {
	
	List<Map<String,Object>> queryId();
	List<Map<String,Object>> queryAll();
}
