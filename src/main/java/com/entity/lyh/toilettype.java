package com.entity.lyh;

public class toilettype {
	private int toiletTypeId;
	private String toiletTypeName;
	public toilettype() {
		super();
		// TODO Auto-generated constructor stub
	}
	public toilettype(int toiletTypeId, String toiletTypeName) {
		super();
		this.toiletTypeId = toiletTypeId;
		this.toiletTypeName = toiletTypeName;
	}
	public int getToiletTypeId() {
		return toiletTypeId;
	}
	public void setToiletTypeId(int toiletTypeId) {
		this.toiletTypeId = toiletTypeId;
	}
	public String getToiletTypeName() {
		return toiletTypeName;
	}
	public void setToiletTypeName(String toiletTypeName) {
		this.toiletTypeName = toiletTypeName;
	}
	@Override
	public String toString() {
		return "toilettype [toiletTypeId=" + toiletTypeId + ", toiletTypeName=" + toiletTypeName + "]";
	}

	
}
