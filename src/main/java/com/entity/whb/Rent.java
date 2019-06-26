package com.entity.whb;

public class Rent {
	private Integer rentid;
	private String rentName;
	public Integer getRentid() {
		return rentid;
	}
	public void setRentid(Integer rentid) {
		this.rentid = rentid;
	}
	public String getRentName() {
		return rentName;
	}
	public void setRentName(String rentName) {
		this.rentName = rentName;
	}
	@Override
	public String toString() {
		return "Rent [rentid=" + rentid + ", rentName=" + rentName + "]";
	}
	
	

}
