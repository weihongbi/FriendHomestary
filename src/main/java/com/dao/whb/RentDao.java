package com.dao.whb;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.entity.whb.Rent;

@Mapper
public interface RentDao {
	@Select("select *from rent")
	List<Rent> query();
}
