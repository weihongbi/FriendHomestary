package com.entity.lyh;

public class rent {
	private int rentid;
	private String rentName;
	public rent() {
		super();
		// TODO Auto-generated constructor stub
	}
	public rent(int rentid, String rentName) {
		super();
		this.rentid = rentid;
		this.rentName = rentName;
	}
	public int getRentid() {
		return rentid;
	}
	public void setRentid(int rentid) {
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
