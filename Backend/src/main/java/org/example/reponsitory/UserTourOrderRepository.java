package org.example.reponsitory;

import org.example.modal.UserTourOrder;
import org.example.modal.UserTourOrder.UserTourOrderKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTourOrderRepository extends JpaRepository<UserTourOrder, UserTourOrderKey> {

    Page<UserTourOrder> findUserTourOrderByStatusOrderByIdDesc(Pageable pageable, int status);
    UserTourOrder findUserTourOrderById(UserTourOrderKey key);

    // Lấy danh sách lịch sử đặt tour theo người dùng (sắp xếp mới nhất lên đầu)
    List<UserTourOrder> findByIdUserIdOrderByIdTourOrderIdDesc(int userId);
}
