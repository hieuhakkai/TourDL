package org.example.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.example.dto.UserTourOrderDTO;
import org.example.modal.UserTourOrder;
import org.example.service.IUserTourOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
public class UserTourOrderController {
	@Autowired
	private IUserTourOrderService userTourOrderService;
	@Autowired
	private ModelMapper modelMapper;

	// Danh sách đơn hàng cho Admin quản lý (phân trang theo trạng thái)
	@GetMapping
	public Page<UserTourOrderDTO> pageUTOs(Pageable pageable, @RequestParam(required = false, defaultValue = "0") int status) {
	    Page<UserTourOrder> pageUTOs = userTourOrderService.pageUTOs(pageable, status);

	    List<UserTourOrderDTO> pageUTOsDTO = pageUTOs.getContent().stream()
	            .map(uto -> modelMapper.map(uto, UserTourOrderDTO.class))
	            .collect(Collectors.toList());

	    return new PageImpl<>(pageUTOsDTO, pageable, pageUTOs.getTotalElements());
	}

	// Lấy chi tiết đơn đặt tour cụ thể
	@GetMapping("/utos-by-order")
	public UserTourOrderDTO findUserTourOrderById(@RequestParam int userId, @RequestParam int orderId) {
		UserTourOrder uto = userTourOrderService.findUserTourOrderById(userId, orderId);
		return modelMapper.map(uto, UserTourOrderDTO.class);
	}

	// Lấy toàn bộ lịch sử đơn đặt tour của khách hàng
	@GetMapping("/user/{userId}")
	public List<UserTourOrderDTO> getOrdersByUserId(@PathVariable int userId) {
		List<UserTourOrder> orders = userTourOrderService.findUserTourOrdersByUserId(userId);
		return orders.stream()
				.map(order -> modelMapper.map(order, UserTourOrderDTO.class))
				.collect(Collectors.toList());
	}

	// Cập nhật trạng thái đơn (Duyệt đơn, Hủy đơn: 0: Chờ xử lý, 1: Đã duyệt, 2: Hoàn thành, -1: Đã hủy)
	@PutMapping
	public void updateStatus(@RequestParam int userId, @RequestParam int orderId, @RequestParam int status) {
		userTourOrderService.updateStatus(userId, orderId, status);
	}

}
