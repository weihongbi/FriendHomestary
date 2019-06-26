package com.entity.lah;

public class houseType {
    private Integer houseTypeId;
    private String houseTypeName;

    public Integer getHouseTypeId() {
        return houseTypeId;
    }

    public void setHouseTypeId(Integer houseTypeId) {
        this.houseTypeId = houseTypeId;
    }

    public String getHouseTypeName() {
        return houseTypeName;
    }

    public void setHouseTypeName(String houseTypeName) {
        this.houseTypeName = houseTypeName;
    }

    @Override
    public String toString() {
        return "houseType{" +
                "houseTypeId=" + houseTypeId +
                ", houseTypeName='" + houseTypeName + '\'' +
                '}';
    }


}
