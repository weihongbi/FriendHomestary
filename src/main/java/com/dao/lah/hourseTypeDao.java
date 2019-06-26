package com.dao.lah;

import com.entity.lah.houseType;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface hourseTypeDao {
    public List<houseType> query();
    int doadd(houseType ht);
    int doupd(houseType ht);
    houseType getid(Integer id);
}
