package com.dao.lyh;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Select;

import com.entity.lyh.customers;



@Mapper
public interface CustomersDao {
	@Select("select * from customers")
	public List<customers> query();
	
	@Select("select * from customers limit #{offset},#{pageSize}")
	public List<customers> queryPage(Integer offset, Integer pageSize);

	@Select("select count(*) from customers")
	public Integer getCount();
}
