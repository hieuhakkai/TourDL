package org.example.service;

import org.example.modal.UserTourOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IUserTourOrderService {
	
	// Lay danh sach don hang cho admin phan trang
	Page<UserTourOrder> pageUTOs(Pageable pageable, int status);

	// Tim chi tiet don hang theo userId va orderId
	UserTourOrder findUserTourOrderById(int userId, int orderId);

	// Lay toan bo danh sach don hang cua mot khach hang
	List<UserTourOrder> findUserTourOrdersByUserId(int userId);

	// Cap nhat trang thai don hang (Duyet / Huy)
	void updateStatus(int userId, int orderId, int status);
	
}
