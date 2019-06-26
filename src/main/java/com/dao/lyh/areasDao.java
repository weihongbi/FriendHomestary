package com.dao.lyh;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface areasDao {
	@Select("SELECT p.province,c.city,a.area from areas a " + 
			"LEFT JOIN cities c " + 
			"on a.cityid=c.cityid " + 
			"LEFT JOIN provinces p " + 
			"ON p.provinceid=c.provinceid")
	public List<Map<String,Object>> queryAll();

	@Select("SELECT p.province,c.city,a.area from areas a " + 
			"LEFT JOIN cities c " + 
			"on a.cityid=c.cityid " + 
			"LEFT JOIN provinces p " + 
			"ON p.provinceid=c.provinceid limit #{offset},#{pageSize}")
	public List<Map<String,Object>> queryPage(Integer offset, Integer pageSize);

	
	@Select("select count(*) from areas")
	public Integer getCount();
}
