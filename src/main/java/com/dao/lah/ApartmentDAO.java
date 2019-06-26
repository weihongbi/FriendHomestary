package com.dao.lah;

import com.entity.lah.Apartments;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ApartmentDAO {
    List<Apartments> query();
    int doadd(Apartments a);
    int doupd(Apartments a);
    Apartments getid(Integer id);
}
