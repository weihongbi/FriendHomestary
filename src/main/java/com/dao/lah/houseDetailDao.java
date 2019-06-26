package com.dao.lah;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.lah.houseDetail;

@Mapper
public interface houseDetailDao {
	List<houseDetail> query();
	int doadd(houseDetail hd);
	int doupd(houseDetail hd);
	houseDetail getid(Integer id);
}
